import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/svelte';
import App from '../routes/+page.svelte';

test('show header in the top page', () => {
	render(App);
	const heading = screen.getByText('初めての方へ');
	expect(heading).toBeInTheDocument();
});

test('should render new content tab first', () => {
	render(App, {
		data: {
			resource: [
				{
					image_url: '',
					title: 'hogeTitle',
					created_at: '2012-12-30 9:00',

					tag_name: 'block',
					description: 'awesome'
				}
			]
		}
	});

	const tab1ContentTitle = screen.getByText('hogeTitle');
	const tab1ContentCreatedAt = screen.getByText('2012-12-30 9:00');
	const tab1ContentTagName = screen.getByText('block');
	const tab1ContentDescription = screen.getByText('awesome');

	expect(tab1ContentTitle).toBeInTheDocument();
	expect(tab1ContentCreatedAt).toBeInTheDocument();
	expect(tab1ContentTagName).toBeInTheDocument();
	expect(tab1ContentDescription).toBeInTheDocument();
});

test('should render my content tab', async () => {
	render(App, {
		data: {
			resourceByTheUser: [
				{
					image_url: '',
					title: 'hogeTitle',
					created_at: '2012-12-30 9:00',

					tag_name: 'block',
					description: 'awesome'
				}
			]
		}
	});

	const tab2Button = screen.getByText('自分の投稿');
	await fireEvent.click(tab2Button);

	const tab2ContentTitle = screen.getByText('hogeTitle');
	const tab2ContentCreatedAt = screen.getByText('2012-12-30 9:00');
	const tab2ContentTagName = screen.getByText('block');
	const tab2ContentDescription = screen.getByText('awesome');

	expect(tab2ContentTitle).toBeInTheDocument();
	expect(tab2ContentCreatedAt).toBeInTheDocument();
	expect(tab2ContentTagName).toBeInTheDocument();
	expect(tab2ContentDescription).toBeInTheDocument();
});

test('should render bookmark tab', async () => {
	render(App, {
		data: {
			bookmarks: [
				{
					image_url: '',
					title: 'hogeTitle',
					created_at: '2012-12-30 9:00',

					tag_name: 'block',
					description: 'awesome'
				}
			]
		}
	});

	const tab2Button = screen.getByText('ブックマークした投稿');
	await fireEvent.click(tab2Button);

	const tab2ContentTitle = screen.getByText('hogeTitle');
	const tab2ContentCreatedAt = screen.getByText('2012-12-30 9:00');
	const tab2ContentTagName = screen.getByText('block');
	const tab2ContentDescription = screen.getByText('awesome');

	expect(tab2ContentTitle).toBeInTheDocument();
	expect(tab2ContentCreatedAt).toBeInTheDocument();
	expect(tab2ContentTagName).toBeInTheDocument();
	expect(tab2ContentDescription).toBeInTheDocument();
});

test('should not render page navigator when there are less than or equal to 10 entries', () => {
	render(App, { data: { count: 0 } });
	const pageNavigator = screen.queryByText('前へ');
	expect(pageNavigator).not.toBeInTheDocument();
});

test('should render page navigator when there is more than 1 entry', () => {
	render(App, {
		data: {
			count: 1,
			resource: [
				{
					image_url: '',
					title: 'hogeTitle',
					created_at: '2012-12-30 9:00',

					tag_name: 'block',
					description: 'awesome'
				}
			]
		}
	});
	const pageNavigator = screen.getByText('前へ');
	expect(pageNavigator).toBeInTheDocument();
});
