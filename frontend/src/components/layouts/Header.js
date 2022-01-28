import { Search } from "./Search";

export const Header = () => {
  return (
    //   select className press cntrl + h to replace all classname spelling
    <nav className='navbar row'>
    <div className='col-12 col-md-3'>
      <div className='navbar-brand'>
        <img src='./images/logo192.png' alt='Logo' />
      </div>
    </div>

    <div className='col-12 col-md-6 mt-2 mt-md-0'>
      <Search/>
      </div>

    <div className='col-12 col-md-3 mt-4 mt-md-0 text-center'>
      <button className='btn' id='login_btn'>
        Login
      </button>

      <span id='cart' className='ml-3'>
        Cart
      </span>
      <span className='ml-1' id='cart_count'>
        2
      </span>
    </div>
  </nav>
  )
};
