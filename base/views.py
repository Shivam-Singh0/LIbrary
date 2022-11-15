
from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from .serializers import BooksSerializer, BooksNameSerializer
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from .models import Books

# Create your views here.


@api_view(['GET'])
def getBooks(request):
    keyword = request.query_params.get('keyword')
    page = request.query_params.get('page')

    books = Books.objects.all().order_by('name')

    if keyword and keyword != '':
        books = Books.objects.filter(
            Q(name__icontains=keyword) | Q(author__icontains=keyword))

    paginator = Paginator(books, 4)
    try:
        books = paginator.page(page)
    except PageNotAnInteger:
        books = paginator.page(1)
    except EmptyPage:
        books = paginator.page(paginator.num_pages)

    serializer = BooksSerializer(books, many=True)
    return Response({'books': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getBookById(request, pk):
    books = Books.objects.get(id=pk)
    serializer = BooksSerializer(books, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createBook(request):
    book = Books.objects.create(
        name='Sample Name',
        author='Sample author name',

    )
    book.save()
    serializer = BooksSerializer(book, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delBook(request, pk):

    book = Books.objects.get(id=pk)

    book.delete()

    return Response('deleted')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def editBook(request, pk):
    data = request.data

    print(data)

    book = Books.objects.get(id=pk)
    image = book.image

    book.name = data['name']
    book.author = data['author']
    book.available = True if data['available'] == 'true' else False
    book.image = image if data['image'] == '' else data['image']

    book.save()
    serializer = BooksSerializer(book, many=False)
    return Response(serializer.data)


@ api_view(['GET'])
def getMatchingBooks(request, pk):
    if pk and pk != '':
        books = Books.objects.filter(
            Q(name__startswith=pk) | Q(author__startswith=pk)).order_by('name')[0:5]

    serializer = BooksNameSerializer(books, many=True)
    return Response(serializer.data)
