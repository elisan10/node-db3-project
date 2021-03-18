-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
    SELECT 
	    p.productname, c.categoryname
        FROM product p
    JOIN category c
	    ON p.categoryid = c.id;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
    SELECT 
	    o.id, s.companyname
    FROM [order] o
    JOIN shipper s
	    ON o.shipvia = s.id
    WHERE o.orderdate < "2012-08-09";

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
    SELECT 
	    p.productname, p.quantityperunit
    FROM orderdetail od
    JOIN product p
	    ON od.productid = p.id
    WHERE od.orderid = 10251;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
    SELECT 
	    o.id, c.companyname, e.lastname
    FROM [order] o
    JOIN customer c 
        ON o.customerid = c.id 
    JOIN employee e 
        ON o.employeeid = e.id