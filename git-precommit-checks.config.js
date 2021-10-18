module.exports = {
  rules: [
    {
      filter: /\.js$/,
      regex: /(?:FIXME|TODO)/i,
      message: "Tu as du travail non terminé",
      nonBlocking: true, // non bloquant (alerte)
    },
    {
      // le blocage du commit est apppliqué sur tous les fichiers (filter n'est pas défini)
      regex: /do not commit/i,
      message: "Tu as du travail qui ne doit pas être commité",
    },
  ],
};
