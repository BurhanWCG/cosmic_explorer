from rest_framework import serializers
from .models import BlogPost

class BlogPostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'category', 'author', 'content',
            'excerpt', 'tags', 'cover_image', 'views',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'views', 'created_at', 'updated_at', 'author']