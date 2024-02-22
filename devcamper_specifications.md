`DevCamper Backend API Specs`
--

Represents the backend for a bootcamp directory website.Below functionalities are implemented in the project.

`BootCamps`
!! 
 1. List all the bootcamps in the project(pagination, filtering, Limiting results)
 2.  Search bootcamp by radius from the zipcode
 3. Get Single Bootcamp
 4.  Create new Bootcamp(Autheticated Users only, Only Publisher or Admin role, only one bootcamp per publisher, field validaiton)
 5. Photo Upload(owner only, Deployed on local system only)
 6. Update Bootcamp(owner only, validation on update)
 7. Delete Bootcamp(owner only)
 8. calculate the overall fee for the bootcamp
 9. Calculate the average rating from reviews of the bootcamps 

`Courses`!!

1. List all the courses for the bootcamps
2.  List all the courses in general(filtering , pagination etc)
 3. Get Single Course
 4.  Create new Course(Autheticated Users only, Only Publisher or Admin role, only owner or admin can add the course)
 5. Update Bootcamp(owner only, validation on update)
 6. Delete Bootcamp(owner only)

`Reviews`!! 
1. List all the Reviews for a bootcamps
2.  List all the Reviews in general(filtering , pagination etc)
 3. Get Single Review
 4.  Create new Review (Autheticated Users only, Only Publisher or Admin role, only owner or admin can add the course)
 5. Update Review(owner only, validation on update)
 6. Delete Review(owner only)

`Users and Authentication`!! 
1. Authentication using JWT Tokens
2. User Registeration(publisher, user)
3. Once User Regsitered token will be send along with cookie and password be hashed.
4. User Login and Logout
5. Get Current Logged In User(via token)
6. Password reset
7. Update UserInfo
8. User CRUD(admin role only)
/
Users can be admins only by updating the DB manually

`Security`!!
1. Encrypting passwords and reset token
2. Preventing No SQL Injections
3. Add headers for security
4. Rate limiting and cross server side scripting

`Documentation`!!
1. Postman for documentation
2. Use docgen to generate HTML files from Postman

`Deployment`!!
1. create a droplet and clone repo to server.
2. Used PM2 for managment
3. create a reverse proxy for port 80


