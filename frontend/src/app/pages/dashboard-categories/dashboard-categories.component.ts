import { Component } from '@angular/core';
import { EventCategory } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-categories.component.html',
  styleUrl: './dashboard-categories.component.css',
})
export class DashboardCategoriesComponent {
  categories!: EventCategory[];
  successMessage: string = '';
  errorMessage: string = '';
  showMessage: boolean = false;
  category: EventCategory = {
    name: '',
    imageUrl: '',
  };
  createState: string = '';

  constructor(private categoryService: CategoryService) {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllEventCategories().subscribe((response) => {
      if (response.success && response.data) {
        this.categories = response.data;
      }
    });
  }

  deleteCategory(categoryId: string) {
    this.categoryService
      .deleteEventCategory(categoryId)
      .subscribe((response) => {
        if (response.success) {
          this.successMessage = response.message;
          this.showMessage = true;
          this.getCategories();
        } else {
          this.errorMessage = response.message;
        }
        setTimeout(() => {
          this.showMessage = false;
          this.errorMessage = '';
          this.successMessage = '';
        }, 2000);
      });
  }

  handleCreateCategory() {
    if (this.createState === 'create') {
      this.createCategory();
    } else if (this.createState === 'edit') {
      this.updateCategory();
    }
  }

  resetCategory() {
    if (this.category.id) {
      this.category.id = '';
    }
    if (this.category.adminId) {
      this.category.adminId = '';
    }
    if (this.category.name) {
      this.category.name = '';
    }
    if (this.category.imageUrl) {
      this.category.imageUrl = '';
    }
    if (this.category.createdAt) {
      this.category.createdAt = undefined;
    }
    if (this.category.updatedAt) {
      this.category.updatedAt = undefined;
    }
  }

  createCategory() {
    if (!this.category.name || !this.category.imageUrl) {
      this.errorMessage = 'Please provide category name and upload image';
      this.showMessage = true;

      setTimeout(() => {
        this.showMessage = false;
        this.errorMessage = '';
        this.successMessage = '';
      }, 2000);
      return;
    }

    this.categoryService
      .createEventCategory(this.category)
      .subscribe((response) => {
        if (response.success) {
          this.getCategories();
          this.successMessage = response.message;
        } else {
          this.errorMessage = response.message;
        }
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
          this.errorMessage = '';
          this.successMessage = '';
        }, 2000);
      });
    this.createState = '';
    this.resetCategory();
  }

  updateCategory() {
    if (!this.category.name || !this.category.imageUrl || !this.category.id) {
      return;
    }
    this.categoryService
      .updateEventCategory(this.category)
      .subscribe((response) => {
        if (response.success) {
          this.getCategories();
          this.successMessage = response.message;
        } else {
          this.errorMessage = response.message;
        }
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
          this.errorMessage = '';
          this.successMessage = '';
        }, 2000);
      });
    this.createState = '';
    this.resetCategory();
  }

  async uploadFiles(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files); // Convert FileList to an array
      const urls: string[] = [];
      for (const file of fileArray) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'shoppie');
        formData.append('cloud_name', 'dr0qq0taf');

        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dr0qq0taf/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );

        const data = await response.json();
        urls.push(data.url);
        this.category.imageUrl = data.url; // Set the imageUrl to display the uploaded image
      }
    }
  }
}
