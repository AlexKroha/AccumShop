from django.shortcuts import get_object_or_404

from store.models import Category


def get_categories(request, category_slug=None):
    category = None
    categories = Category.objects.all().order_by()
    if category_slug:
        category = get_object_or_404(Category, slug=category_slug)
    return locals()