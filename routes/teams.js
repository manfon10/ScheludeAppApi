const express = require("express");

const { catchAsync } = require("../helpers/catchAsync");

const teamsServices = require("../services/teams");
const authServices = require("../services/auth");

const { getAll, getById, create, update, deleteTeam } = teamsServices;
const { protectToken } = authServices;

const router = express.Router();

router.get('/', catchAsync(async (req, res) => {
  const sessionUser = await protectToken(req);

  console.log(sessionUser);

  const teams = await getAll(sessionUser.user.data._id);

  return res.status(teams.success ? 200 : 400).json(teams)
}));

router.get('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;

  const team = await getById(id);

  return res.status(team.success ? 200 : 400).json(team);
}));

router.post('/', catchAsync(async (req, res) => {
  const sessionUser = await protectToken(req);

  const team = await create(req.body, sessionUser.user.data);

  return res.status(team.success ? 200 : 400).json(team);
}));

module.exports = { teamsRouter: router };
