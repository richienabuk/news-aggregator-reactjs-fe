export const mainMenu = [
	{
		label: 'Sources',
		to: '/sources'
	},
	{
		label: 'Authors',
		to: '/authors'
	},
	{
		label: 'Categories',
		to: '/categories'
	}
];

export const userMenu = [
	{
		label: 'Create account',
		to: '/auth/sign-up',
		anonymous: true
	},
	{
		label: 'Login',
		to: '/auth/login',
		anonymous: true
	},
	{
		label: '{userName}',
		protected: true,
		menu: [
			{
				label: 'Preferences',
				to: '/user/preferences',
			},
			{
				isDivider: true,
			},
			{
				label: 'Log Out',
				isLogout: true,
			},
		],
	}
]
