import NavbarMenu from "./component/MenuBar/NavbarMenu";
import BoardBar from "./component/BoardMenu/BoardBar";
import Board from "./component/BoardCollection/Board"

export default function App() {
  return (
    <div >
      <NavbarMenu/>
      <BoardBar/>
      <div className="flex justify-center items-center h-screen">
        <Board />
      </div>
    </div>
    
  )
}
