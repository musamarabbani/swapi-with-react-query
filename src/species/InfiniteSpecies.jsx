import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import { Species } from './Species';

const initialUrl = 'https://swapi.dev/api/species/';
const fetchUrl = async (url) => {
	const response = await fetch(url);
	return response.json();
};

export function InfiniteSpecies() {
	const {
		data,
		isLoading,
		isFetching,
		isError,
		error,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteQuery(
		'sw-people',
		({ pageParam = initialUrl }) => fetchUrl(pageParam),
		{
			getNextPageParam: (lastPage) => lastPage.next || undefined,
		}
	);
	if (isLoading) return <div className='loading'>Loading...</div>;
	if (isError) return <div>Error! {error.toString()}</div>;
	// TODO: get data for InfiniteScroll via React Query
	return (
		<>
			{isFetching && <div className='loading'>Loading...</div>}
			<InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
				{data.pages.map((pageData) => {
					return pageData.results.map((species) => (
						<Species
							key={species.name}
							name={species.name}
							language={species.language}
							averageLifespan={species.average_lifespan}
						/>
					));
				})}
			</InfiniteScroll>
		</>
	);
}
