
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from .models import Books, User


class UserSerializer(serializers.ModelSerializer):
    isAdmin = serializers.SerializerMethodField(read_only=True)
    name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User

        fields = ['id', 'email', 'name', 'isAdmin']

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):

        name = obj.first_name + ' ' + obj.last_name
        if name == " ":
            name = obj.email

        return name.rstrip()


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class BooksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Books
        fields = '__all__'


class BooksNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Books
        fields = ['name']
