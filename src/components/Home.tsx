import Banner from './Banner/Banner';
import SobreNos from './SobreNos/SobreNos';
import Slide from './Slide/Slide';
import Collections from './Collections/Collections';



export default function Home() {
  return (
    <>
            <div style={{ position: 'relative', zIndex: 1 }}>
        <Banner />
      </div>
      <SobreNos />
      <Slide />
      <Collections />
    </>
  );
}