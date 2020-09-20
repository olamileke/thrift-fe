### Thrift-fe

------------

A personal finance application to keep track of  spending.  Generate charts  of weekly and monthly spending, download spending reports in excel file format and view graphical summaries of spending. 

Front end written in Angular. The backend is written in Lumen with php and can be found [here](https://github.com/olamileke/thrift-be.git "here").

I likely will not take this live because I am a much better developer since I built this and it can be improved upon. I will probably rewrite it in Next js.


[![](https://s3-us-east-2.amazonaws.com/thescreenshotsbucket/thrift/Screenshot_2019-07-24%20thrift.png)](https://s3-us-east-2.amazonaws.com/thescreenshotsbucket/thrift/Screenshot_2019-07-24%20thrift.png)

[![](https://s3-us-east-2.amazonaws.com/thescreenshotsbucket/thrift/Screenshot_2019-07-24-thrift-signup.png)](https://s3-us-east-2.amazonaws.com/thescreenshotsbucket/thrift/Screenshot_2019-07-24-thrift-signup.png)

[![](https://s3-us-east-2.amazonaws.com/thescreenshotsbucket/thrift/Screenshot_2019-07-24%20thrift-login.png)](https://s3-us-east-2.amazonaws.com/thescreenshotsbucket/thrift/Screenshot_2019-07-24%20thrift-login.png)

[![](https://s3-us-east-2.amazonaws.com/thescreenshotsbucket/thrift/Screenshot_2019-07-24%20thrift-dashboard.png)](https://s3-us-east-2.amazonaws.com/thescreenshotsbucket/thrift/Screenshot_2019-07-24%20thrift-dashboard.png)

[![](https://s3-us-east-2.amazonaws.com/thescreenshotsbucket/thrift/Screenshot_2019-07-24%20thrift-week-analysis.png)](https://s3-us-east-2.amazonaws.com/thescreenshotsbucket/thrift/Screenshot_2019-07-24%20thrift-week-analysis.png)


------------


To run this application locally, you must have node installed. Get that [here](https://nodejs.org "here"). You also need to have the Angular CLI installed. To do this, open up your terminal and run

```
npm install -g @angular/cli
```

This will install the latest version of the Angular CLI which will enable you to run Angular applications.

Next up, navigate into the directory of your choice on your system and clone this repository by running

```
git clone https://github.com/olamileke/thrift-fe.git
```

When cloning is complete, navigate into the application directory by running

```
cd thrift-fe
```

At this point, we need to install all the packages needed by the app to run. Do this by running

```
npm install
```

This will install all the packages defined in the package.json file in the application root.

Navigate to the src/environments directory and set the url option in the environment.ts file to whatever url the cloned backend is running on.

Still in the terminal, run

```
ng serve
```
When the application is done compiling, access it at localhost:4200. Alternatively, you can specify the port you want the app to run at by adding a  port parameter like

```
ng serve --port 5000
```
Here the app will be available at localhost:5000.
