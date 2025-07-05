from django.urls import path
from .views import UserBlogPostListCreateAPIView, BlogPostUpdateDeleteAPIView,PublicBlogPostListAPIView

urlpatterns = [
    path('posts/', UserBlogPostListCreateAPIView.as_view(), name='list-create-blogpost'),
    
    path('posts/<int:pk>/', BlogPostUpdateDeleteAPIView.as_view(), name='update-delete-blogpost'),
    path('public-posts/', PublicBlogPostListAPIView.as_view(), name='public-blog-list'),
]
