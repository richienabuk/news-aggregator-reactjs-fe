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
		anonymous: true,
		className: 'w-auto px-5 py-2 bg-white border-black text-red-900 fill-red active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70 mr-3 md:mr-0'
	},
	{
		label: 'Login',
		to: '/auth/login',
		anonymous: true,
		className: 'w-auto px-5 py-2 bg-red-900 border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70'
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
				label: 'Log Out',
				isLogout: true,
			},
		],
	}
]
