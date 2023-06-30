package routes

import (
	"dumbmerch/handlers"
	"dumbmerch/pkg/middleware"
	"dumbmerch/pkg/mysql"
	"dumbmerch/repositories"

	"github.com/labstack/echo/v4"
)

func CategoryRoutes(e *echo.Group) {
	categoryRepository := repositories.RepositoryCategory(mysql.DB)
	h := handlers.CategoryHandlers(categoryRepository)

	e.POST("/category", middleware.Auth(h.CreateCategory))
	e.GET("/categories", middleware.Auth(h.FindCategories))
	e.GET("/category/:id", middleware.Auth(h.GetCategory))
	e.PATCH("/category/:id", middleware.Auth(h.UpdateCategory))
	e.DELETE("/category/:id", middleware.Auth(h.DeleteCategory))
}
