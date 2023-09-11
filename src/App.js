import NavbarMenu from "./component/MenuBar/NavbarMenu";
import BoardBar from "./component/BoardMenu/BoardBar";
import BoardCollection from "./component/BoardCollection/BoardCollection"

export default function App() {
  return (
    <div >
      <NavbarMenu/>
      <BoardBar/>
      <div className="flex justify-center items-center h-screen">
        <BoardCollection />
      </div>
    </div>
    
  )
}
