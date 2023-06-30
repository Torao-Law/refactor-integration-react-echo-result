package categorydto

type CategoryRequest struct {
	Name      string `json:"name" form:"name" validate:"required"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

type UpdateCategoryRequest struct {
	Name      string `json:"name" form:"name" validate:"required"`
	UpdatedAt string `json:"updated_at"`
}

type CategoryResponse struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}
