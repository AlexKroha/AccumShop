from django.shortcuts import render

# Create your views here.
from django.views.generic import ListView
from store.models import Product


class SearchProduct(ListView):
    template_name = 'search/view.html'

    def get_context_data(self, *args, **kwargs):
        context = super(SearchProduct, self).get_context_data(*args, **kwargs)
        query = self.request.GET.get('q')
        context['query'] = query
        return context

    def get_queryset(self, *args, **kwargs):
        request = self.request
        method_dict = request.GET
        query = method_dict.get('q', None)
        if query is not None:
            return Product.objects.search(query=query)
        return Product.objects.featured()