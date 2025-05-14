import asyncHandler from 'express-async-handler';
import UserTable from '../models/userModel.js';

const userController = {
    /**
     * @desc    Bütün istifadəçiləri getirmek
     * @route   GET /api/v1/users
     * @access  Private/Admin
     */
    allUsers: asyncHandler(async (req, res) => {
        const users = await UserTable.findAll();

        res.status(200).json({
            success: true,
            message: 'Bütün istifadəçilər gətirildi',
            data: users
        });
    }),

    /**
     * @desc    Tek bir istifadəçini getirmek
     * @route   GET /api/v1/users
     * @access  Private/Admin
     */
    getUser: asyncHandler(async (req, res) => {
        const { id } = req.params;

        const user = UserTable.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'İstifadəçi tapılmadı'
            })
        }

        res.status(200).json({
            success: true,
            message: 'İstifadəçi gətirildi',
            data: user
        })
    })
}

export default userController;