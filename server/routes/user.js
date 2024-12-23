import express from "express"
import { approveUser, rejectUser, getPendingUsers, searchUser } from "../controllers/user.js";

const router = express.Router();

router.get('/search-user/:name', searchUser);
router.get('/get-pending-users', getPendingUsers);
router.post("/approve-user", approveUser);
router.post("/reject-user", rejectUser);

export default router