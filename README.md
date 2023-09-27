# SocialMedia-API
An application interface for social media platform, users can post, comment and create friendships.</br>
<strong>Video Demo at : https://drive.google.com/file/d/1VVTr3BU1pQ6hhjDUZ9WgaPZv1LGV4lRR/view?usp=sharing </strong>

<p>Tech stacks used:
  <ul>
    <li>MongoDb</li>
    <li>Mongoose</li>
    <li>ExpressJs</li>
    <li>NodeJs</li>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
    <li>Passport , passport-JWT strategy for authentication</li>
  </ul>
</p>

<p>The project follows MVC folder structuring, and practical nomenclature i.e
   <ul>
    <li>All the database document schemas are under Model folder</li>
    <li>All the server side functions are under Controller folder</li>
    <li>Asset folder contains static files</li>
   <li>Config folder contains all the configuration functions, i.e. Database configurations, Authorisation library configurations, etc.</li>
     <li>Routes foolder consists routing configuration</li>
   </ul>
 </p>

<p>Setting up the project to run locally in your machine:
  <ol>
    <li>Clone the repository files to your desired location on you local machine</li>
    <li>Navigate to the cloned files destination using command line</li>
    <li>Make sure you have node and npm installed on your system, if not then install nvm from the following link https://github.com/nvm-sh/nvm and then follow the commands in the readme section to further install node and npm</li>
    <li>Once in the cloned directory run the command "npm install" to intall all the dependent node modules</li>
    <li>Once dependencies are installed just run the command "npm start" to start the application</li>
    <li>On browser open "localhost:8000" to access the application interface running on your local machines server on port 8000</li>
    <li>Use postman to send requests to the application and get JSON response-back</li>
  </ol>
</p>
<p>Application usage and req formats for postman
<ul>
    <li>For creating new user send a POST req to http://localhost:8000/api/v1/users/create-user with form data -> [ key: email and value:"Your email" , key: password and value:"Your password here" , key: name and value:"Your name here" ]</li>
    <li>For generating access token(JWT) send a POST req to http://localhost:8000/api/v1/users/create-session generated token is then returned back in the response which can be stored in client side and sent in authorisation header for each requests requiring it </li>
    <li>For authorization use the generated token and add it to Authorization header's value (create new header as key : Authorization if not already present) </li>
    <li>NOTE:Creating/deleting post/comment/friendship requires authorization header to be present in the request</li>
    <li>For fetching user profile information send a GET req to http://localhost:8000/api/v1/users/profile/"target profile ID" </li>
    <li>For listing all posts send a GET req to http://localhost:8000/api/v1/posts/ </li>
    <li>For creating a new post send a POST req to http://localhost:8000/api/v1/posts/create with form data -> [ key:content and value:"post content here" ] in the body , also make sure to add the authorization header with the generated token for this request</li>
    <li>Similarly for creating comment you need to POST req to http://localhost:8000/api/v1/comment/create with form data -> [ key:content and value:"post content here" , key:postID and value:"ID of the post in which comment is being made" ] in the body  </li>
    <li>For deletion of post/comment send a DELETE req to http://localhost:8000/api/v1/posts/"post ID here" or http://localhost:8000/api/v1/comment/"comment ID here" respectively along with authorization header</li>
    <li>For creating toggling friendship relation between users send a POST req to http://localhost:8000/api/v1/friends/toggle with form data -> [ key:toUser and value:"User ID of target user here" ]</li>
</ul>
</p>
