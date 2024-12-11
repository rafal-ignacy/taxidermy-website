import NavBar from '@components/Navbar';
import Header from '@components/Header';
import CategoryThumbnailsRow from '@components/CategoryThumbnailsRow';

function Home() {

  return (
    <>
      <NavBar expand='lg' dark />
      <Header/>
      <CategoryThumbnailsRow/>
    </>
  );
}

export default Home;
