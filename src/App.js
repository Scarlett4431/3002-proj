import NavbarMenu from "./component/MenuBar/NavbarMenu";
import BoardBar from "./component/BoardMenu/BoardBar";
import BoardCollection from "./component/BoardCollection/BoardCollection";
import Board from "./component/Board/Board";

export default function App() {
  return (
    <div >
      <NavbarMenu/>
      {/* <div className="flex justify-center items-center h-screen">
        <BoardCollection />
      </div> */}
      <Board/>

    </div>
    
  )
}
