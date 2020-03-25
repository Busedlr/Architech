import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{
		path: 'home',
		loadChildren: () =>
			import('./pages/home/home.module').then(m => m.HomePageModule)
	},
	{
		path: 'create-project',
		loadChildren: () =>
			import('./pages/create-project/create-project.module').then(
				m => m.CreateProjectPageModule
			)
	},
	{
		path: 'clients',
		loadChildren: () =>
			import('./pages/clients/clients.module').then(m => m.ClientsPageModule)
	},
	{
		path: 'project-detail/:id',
		loadChildren: () =>
			import('./pages/project-detail/project-detail.module').then(
				m => m.ProjectDetailModule
			)
	},
	{
		path: 'image-display',
		loadChildren: () =>
			import('./modals/image-display/image-display.module').then(
				m => m.ImageDisplayModalPageModule
			)
	},
	{
		path: 'todo-list',
		loadChildren: () =>
			import('./modals/todo-list/todo-list.module').then(
				m => m.TodoListPageModule
			)
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
