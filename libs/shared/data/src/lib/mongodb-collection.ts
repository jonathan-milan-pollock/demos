/*
static readonly Func<IMongoCollection<SlugDocument>> Load = () =>
        {
            var cosmosdbConnectionstring = Environment.GetEnvironmentVariable("COSMOSDB_CONNECTION_STRING");

            var settings = MongoClientSettings.FromUrl(
                new MongoUrl(cosmosdbConnectionstring)
            );
            settings.SslSettings =
                new SslSettings {EnabledSslProtocols = SslProtocols.Tls12};

            var drpDatabase = new MongoClient(settings).GetDatabase("drpmongodb");
            return drpDatabase.GetCollection<SlugDocument>("slug-documents");
        };
 **/

//var cosmosdbConnectionstring = Environment.GetEnvironmentVariable("COSMOSDB_CONNECTION_STRING");
//var database = MongoCollection.LoadDatabase(cosmosdbConnectionstring);
/*
          
              var artistsCollection = database.GetCollection<ArtistDocument>("artists");
              SlugRepository<ArtistDocument>.CreateIndex(artistsCollection);
              var artistDocuments = new Collection<ArtistDocument>();
              foreach (var artist in ArtistsContent.Artists())
              {
                  var artistDocument = new ArtistDocument();
                  artistDocument.Slug = artist.Slug;
                  artistDocument.Name = artist.Name;
                  artistDocument.Images = artist.
              }
              var artis = new AR
              SlugRepository<ArtistDocument>.Save(artistsCollection, );
             
              */
