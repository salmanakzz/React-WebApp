import Body from "../components/Body/Body";
import Header from "../components/Header/Header";

function HomePage({ user, authUrl }) {
  return (
    <>
      <Header user={user} />
      <Body user={user} />
    </>
  );
}

export default HomePage;
