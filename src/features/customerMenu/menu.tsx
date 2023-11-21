import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetStoreQuery } from './customerMenuApiSlice';
import Welcome from './welcome';
import MenuList from './menuList'

function Menu() {
  const { id } = useParams();

  const [store, setStore] = useState(null);
  const [isMenuList, setIsMenuList] = useState(false);
  const [isWelcome, setIsWelcome] = useState(true);


  const { data, isFetching: isFetchingStore } = useGetStoreQuery({id: id}, {
    // refetchOnFocus: true,
    // refetchOnMountOrArgChange: true
  });

  useEffect(() => {
    if (!data) return;
    const { data: storeData } = data ?? {};
    setStore(storeData);
  }, [data]);

  async function handleGoToMenu() {
    setIsWelcome(false)
    setIsMenuList(true)
  }

  if (isFetchingStore) {
    return (
      <div className=" h-screen w-screen flex justify-center items-center">
        <span className="loader"></span>
      </div>
    )
  }

  return (
    <>
      {isWelcome && 
        <Welcome name={store?.name} goToMenu={handleGoToMenu}/>
      }
      {isMenuList && 
        <MenuList store={store} />
      }
    </>
  )
}

export default Menu