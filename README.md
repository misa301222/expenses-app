# Expenses App
Web Application focused on social media where you can have a control about your expenses, send messages (SocketIO) and see another accounts. There's 2 roles, User and Administrator. Created using NextJs with Typescript and Mongoose. Database is MongoDB. Using JWT Authentication and Next-Auth.

## Home Section
Home Section is where you can see information about the App. There's a form where you can create an account and login.

### Home (Not Logged In)
![Expenses App - Opera 2022-02-07 18-26-09_Trim](https://user-images.githubusercontent.com/92189889/152907319-ccf9a924-a3ab-4c0c-9434-c401a63d5de7.gif)


### Home (Logged In)
![Expenses App - Opera 2022-02-07 18-26-55_Trim (1)](https://user-images.githubusercontent.com/92189889/152907328-f33ce24e-614d-4f21-b13b-e44a39f0418e.gif)

## Expenses Section
Here you can see a quick look at your total spent by Month. At the right you have useful links.

![image](https://user-images.githubusercontent.com/92189889/152907413-d8ecaa17-6417-4474-b185-f00eb2822b3e.png)

## New Expense
This section is where you can add a new Expense. You must type what you bought, quantity, your feeling and the date.

![image](https://user-images.githubusercontent.com/92189889/152907799-d2aa0e3d-cccc-45e1-954e-66f3b4984e18.png)

## Show Expense
In this section you can see all the relevant data about your expenses, you can sort it by year. Also you can update or delete any expense.

![image](https://user-images.githubusercontent.com/92189889/152907846-32398cda-22cd-4bb5-8121-139397d18ba3.png)

## Edit Profile Info
Section where you can edit all your profile data. Setting privacity about your expenses. Update your hobbies, education, work. And a little section where you can link your favorite images. 

![localhost_3000_profile - Opera 2022-02-07 18-44-50_Trim](https://user-images.githubusercontent.com/92189889/152908489-888898f7-8e96-4623-ac6f-4fe6dab60fe0.gif)

## Social Section
This app was developed thinking about making a small social web application. So there's a couple social functionalities.

### Users
In this section you can see all the accounts in the web application. You can search them by Name. The name doesn't have to be exact since it works if the name contains the string from the search bar.

![image](https://user-images.githubusercontent.com/92189889/152908815-111d17d9-dc84-4d25-b1ec-d0aae8e77ea0.png)

Searching Alex
![image](https://user-images.githubusercontent.com/92189889/152908961-2733ad1d-82a5-4a41-afd4-024798df2cec.png)

### Viewing a User Profile (Test User in this case)
Here is where all the information is displayed for the other users. 

![localhost_3000_viewUsers_viewUsers - Opera 2022-02-07 18-54-39_Trim](https://user-images.githubusercontent.com/92189889/152910067-07ecd9ea-f01b-4e21-a28f-393b9060e1b7.gif)

## Messages
This App has a Section where you can message in chat rooms. You can join and exit any room at any time. It uses web sockets, so every time you send a message, all the users that have the room open will receive the message. 

![localhost_3000_messages_viewMessages - Opera 2022-02-07 19-09-09_Trim](https://user-images.githubusercontent.com/92189889/152910959-31c07d53-22d4-40e5-880d-55d441c7d825.gif)

## Administrator
Administrator has exclusive tools. In this case the tools are related to Rooms Managment. 

![image](https://user-images.githubusercontent.com/92189889/152911460-a399ad1a-9567-4c09-bc85-7e2c852629eb.png)

## Adding new Room
![image](https://user-images.githubusercontent.com/92189889/152911551-16f08cae-a8be-4904-9e2c-4613dd3ce429.png)

## Displaying All Rooms
By clicking in the card you can update the room name, also there's a Danger Zone where you can delete the room. For security reasons you must type the id of the room in order to delete. Once deleted, all the messages of the room get deleted as well.

![image](https://user-images.githubusercontent.com/92189889/152911578-04a256bb-2271-4f77-9ff2-e4f1978ba28d.png)







