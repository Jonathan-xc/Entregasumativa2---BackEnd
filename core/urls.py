
from django.urls import path
from . import views

urlpatterns = [
    path('', views.PrimeraPagina, name='Primera Pagina'),
    path('agregar-producto/', views.agregar_producto, name='agregar_producto'),
]
