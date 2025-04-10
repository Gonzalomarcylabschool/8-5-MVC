import handleFetch from "./handleFetch"

export const getAllFellows = async () => {
  const [allFellows, error] = await handleFetch('/api/fellows/')
  return [allFellows, error];
}

export const getFellowById = async (id) => {

}

export const createFellow = async (fellowName) => {

}

export const deleteFellow = async (id) => {

}

export const updateFellowName = async (id, fellowName) => {

}