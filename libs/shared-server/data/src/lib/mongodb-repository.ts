/*
static async Task<IMongoCollection<SlugDocument>> DeleteAllAsync(
           this IMongoCollection<SlugDocument> collection)
       {
           var filter = Builders<SlugDocument>.Filter.Empty;
           await collection.DeleteManyAsync(filter);
           return collection;
       }

       static async Task<IMongoCollection<SlugDocument>> SaveAsync(
           this IMongoCollection<SlugDocument> collection,
           SlugDocument slugDocument)
       {
           var filter = Builders<SlugDocument>.Filter.Eq("slug", slugDocument.Slug);
           var foundDocument = collection.Find(filter).FirstOrDefault();
           if (foundDocument == null)
               await collection.InsertOneAsync(slugDocument);
           else
               await collection.FindOneAndReplaceAsync(filter, slugDocument);
           return collection;
       }
 **/
