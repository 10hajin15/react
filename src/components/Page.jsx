import * as MyLayout from "../MyLayout"

const Page = ({header, children, footer}) => (
  <div className="Page">
    <header>{header}</header>
    <main>{children}</main>
    <footer>{footer}</footer>
    <MyLayout.DialogContainer />
  </div>
)

export default Page;