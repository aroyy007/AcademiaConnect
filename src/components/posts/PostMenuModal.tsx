import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import axios from 'axios';
import { useAuthStore } from '../../store/auth';


export default function PostMenuModal({ post_id }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const user = useAuthStore(state => state?.user)
  const token = useAuthStore(state => state?.token)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      const res = await axios.post("http://localhost:9000/api/posts/delete-post", {
        post_id: post_id,
        user_id: user?._id
      },{
        headers : {
          Authorization : `Bearer ${token}`
        }
      });

      const data = res?.data;

      if (data?.success) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <BsThreeDots className='text-[#000]' />

      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleDelete()} disabled={isLoading} className='flex items-center gap-x-2 !text-sm'>
          <MdOutlineDelete className='text-red-500' />
          Delete
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
    </div>
  );
}
