export const getMarketDataFromOddsResponse = (oddsResponse) => {
    const firstMatch = oddsResponse[0];
    let data = {
        homeTeam: firstMatch.home_team,
        awayTeam: firstMatch.away_team,
        odds: firstMatch.bookmakers[0].markets[0].outcomes
    }

    console.log({firstMatchData: data})
    return data;
}