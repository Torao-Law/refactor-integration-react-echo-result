package repositories

import (
	"dumbmerch/models"

	"gorm.io/gorm"
)

type ProductRepository interface {
	FindProducts() ([]models.Product, error)
	GetProduct(ID int) (models.Product, error)
	CreateProduct(product models.Product) (models.Product, error)
	FindCategoriesId(ID []int) ([]models.Category, error)
	UpdateProduct(product models.Product) (models.Product, error)
	DeleteProduct(product models.Product, ID int) (models.Product, error)
	DeleteProductCategoryByProductId(product models.Product) (models.Product, error)
}

func RepositoryProduct(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindProducts() ([]models.Product, error) {
	var products []models.Product
	err := r.db.Preload("User").Preload("Category").Find(&products).Error

	return products, err
}

func (r *repository) GetProduct(ID int) (models.Product, error) {
	var product models.Product
	err := r.db.Preload("User").Preload("Category").First(&product, ID).Error

	return product, err
}

func (r *repository) CreateProduct(product models.Product) (models.Product, error) {
	err := r.db.Create(&product).Error

	return product, err
}

func (r *repository) FindCategoriesId(ID []int) ([]models.Category, error) {
	var categories []models.Category
	err := r.db.Find(&categories, ID).Error

	return categories, err
}

func (r *repository) UpdateProduct(product models.Product) (models.Product, error) {
	r.db.Exec("DELETE FROM product_categories WHERE product_id=?", product.ID)
	err := r.db.Save(&product).Error

	return product, err
}

func (r *repository) DeleteProduct(product models.Product, ID int) (models.Product, error) {
	err := r.db.Delete(&product, ID).Scan(&product).Error

	return product, err
}

func (r *repository) DeleteProductCategoryByProductId(product models.Product) (models.Product, error) {
	r.db.Exec("DELETE FROM product_categories WHERE product_id=?", product.ID)
	err := r.db.Preload("User").Preload("Category").First(&product, product.ID).Error

	return product, err
}
