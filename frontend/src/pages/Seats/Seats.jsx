import MainSeat from "./components/MainSeat/MainSeat";
import NavSeat from "./components/NvaSeat/NavSeat";
import FootSeat from "./components/FootSeat/FootSeat"


export default function Seats() {
  return (
    <div>
      <NavSeat/>
      <MainSeat/>
      <FootSeat/>
    </div>
  )
}
