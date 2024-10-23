from django.shortcuts import render, redirect
from .forms import ProductoForm
from .models import Producto



# Vista para la página principal que muestra los productos
def PrimeraPagina(request):
    productos = Producto.objects.all()  # Obtener todos los productos
    return render(request, 'core/primerapagina.html', {'productos': productos})

def agregar_producto(request):
    if request.method == 'POST':
        form = ProductoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('Primera Pagina')
    else:
        form = ProductoForm()
    
    return render(request, 'core/agregar_producto.html', {'form': form})
