var comments = [
	{content: 'Super phone!', productId: 1},
	{content: 'Apple the best', productId: 1},
	{content: 'Recommend, good phone', productId: 3},
	{content: 'Beware, it is very big!', productId: 3},
	{content: 'First comment here ^_^', productId: 4}
];

module.exports = function(server)
{
	var dataSource = server.dataSources.db;
	dataSource.automigrate('Comment', function(er)
	{
		if (er) throw er;

		var Model = server.models.Comment;
		//create sample data
		var count = comments.length;
		comments.forEach(function(comment)
		{
			Model.create(comment, function(er, result)
			{
				if (er) return;

				console.log('Record created:', result);
				count--;
				if (count === 0)
				{
					console.log('done');
					dataSource.disconnect();
				}
			});
		});
	});
};