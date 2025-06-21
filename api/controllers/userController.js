import asyncHandler from 'express-async-handler';
import UserTable from '../models/userModel.js';
import { Op } from "sequelize"

const userController = {
    /**
     * @desc    Bütün istifadəçiləri getirmek
     * @route   GET /api/v1/users
     * @access  Private/Admin
     */
    allUsers: asyncHandler(async (req, res) => {
        const users = await UserTable.findAll({ where: { role: { [Op.ne]: 2 } } });

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

        const user = await UserTable.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'İstifadəçi tapılmadı'
            })
        }

        if (user.role === 2) {
            return res.status(403).json({
                success: false,
                message: 'Bu istifadəçi görünməyə icazə verilmir'
            });
        }

        res.status(200).json({
            success: true,
            message: 'İstifadəçi gətirildi',
            data: user
        })
    }),

    /**
   * @desc    Tek bir istifadəçini getirmek
   * @route   GET /api/v1/users/update/id
   * @access  Private/User
   */
    // updateUser: asyncHandler(async (req, res) => {
    //     const userId = req.user.id;
    //     const {name} = req.body;

    //     if (!userId) {
    //         return res.status(401).json({
    //             success: false,
    //             message: 'Istifadəçi tapılmadı.'
    //         })
    //     }

    //     const user = 
    // })
}

export default userController;