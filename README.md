# User-Management-Rest-API-MongoDB
Create User, Get All User, Get User by ID, Update User, Delete User
# MVC Pattern
# path
# Get All User 
http://localhost:5000/api/users
# Get User by ID
http://localhost:5000/api/users/{id}
# Create new User
http://localhost:5000/api/users
into body:
{
"name":"John Smith",
"age":45
}
id wil auto created and createOn is created time (defalut) 
# Update User
http://localhost:5000/api/users/{id}
# Delete User
http://localhost:5000/api/users/{id}
