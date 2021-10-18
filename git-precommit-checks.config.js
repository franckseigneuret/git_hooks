module.exports = {
  rules: [
    {
      filter: /\.js$/,
      nonBlocking: "true",
      message: "🤫 Oula, aurais-tu oublié des `console.log` inopportuns ?",
      regex: "console\\.log",
    },
    {
      // ici, le blocage du commit est apppliqué sur tous les fichiers (filter n'est pas défini)
      message: "😨 On dirait que tu as oublié des marqueurs de conflits",
      regex: "/^[<>|=]{4,}/m",
    },
    {
      message: "🤔 Aurais-tu oublié de finir des développement ?",
      nonBlocking: "true",
      regex: "(?:FIXME|TODO)",
    },
  ],
};
