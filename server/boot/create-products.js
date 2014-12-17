var products = [
	{name: 'Iphone 6', description: 'Apple super phone', price: '210'},
	{name: 'Iphone 6 Plus', description: 'Apple super phone', price: '220'},
	{name: 'OnePlus One 64Gb', description: 'Best Android device', price: '230'},
	{name: 'OnePlus One 16Gb', description: 'Best Android device', price: '240'},
	{name: 'Nexus 6', description: 'Made by Google', price: '250'}
];

module.exports = function(server)
{
	var dataSource = server.dataSources.db;
	dataSource.automigrate('Product', function(er)
	{
		if (er) throw er;

		var Model = server.models.Product;
		//create sample data
		var count = products.length;
		products.forEach(function(product)
		{
			Model.create(product, function(er, result)
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