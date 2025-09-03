export default async function MovieDetail(props: PageProps<'/movie/[id]'>) {
  const { id } = await props.params;

  return <>Movie {id}</>;
}
