import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Generate and Share AI prompts with
            <br className="max-md:hidden"/>
            <span className="blue_gradient text-center">
                Promptopia
            </span>
        </h1>
        <p className="desc text-center">Promptopia is an open-source AI prompting tool to discover, create and share unique prompts. Create custom GPTs with ease.</p>
        <Feed />
    </section>
  )
}

export default Home
