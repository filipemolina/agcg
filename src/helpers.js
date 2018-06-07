// Helper Functions

export const selecionaDestino = tipo => {

	let destino

	if(tipo === 'criatura')
    destino = 'battlefield'
  else if(tipo === 'evento')
    destino = 'descarte'
  else
    destino = 'terreno'

  return destino

}