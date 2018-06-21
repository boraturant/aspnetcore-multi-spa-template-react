# aspnetcore-multi-spa-template-react
Multi-SPA React Template for Asp.Net Core 2.1+, WebPack 4.0+. Supports Bundle/Code splitting, hashing and injection into ASP.NET views

### About

ASP.NET Core project template/tooling for multi-SPAs within a ServerSide ASP.NET Core solution. E.g: Create separate React apps to be injected into different server-side views (.cshtml) within a single solution.

### Background
The new React SPA templates from Microsoft (2.1+) only supports Create-React-App based template with no automatic bundle injection into the server side code. 

This project template supports non-CRA based React apps within .net core project, with automatic bundle/code spliting and injection into server side views.

### Features

- WebPack 4.0+
- React 16+
- Typescript
- Automatic bundle/code spliting (JS/CSS)
- Automatic bundle injection (hash) into server side views
- Multi app support
- Hot Module Reloading with Integrated Development Server.
- ASP.NET core ise used for server-side API access, server side routing of SPAs. 
- wwwroot/dist based deployment

### How to use

Clone the repo. Open the .sln in Visual Studio. Hit F5 to launch server side server at localhost:5000.

Open the ClientApp in Visual Studio Code. Run the Dev Server with 'npm run start'. 

### How to configure

Set up your app entrypoints, htmp-webpack-plugin templates, and server side inject views in project.json.

```
"entryPoints": [
		{
			"chunkName": "myApp1",
			"entryPoint": "./src/apps/myapp1/index.tsx",
			"htmlTemplateFile": "../views/home/myApp1_template.cshtml",
			"htmlOutputFile": "../views/home/myApp1.cshtml"
		},
		{
			"chunkName": "myApp2",
			"entryPoint": "./src/apps/myapp2/index.tsx",
			"htmlTemplateFile": "../views/home/myApp2_template.cshtml",
			"htmlOutputFile": "../views/home/myApp2.cshtml"
		}
	],
```


