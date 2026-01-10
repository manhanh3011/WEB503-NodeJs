const products = [
    {id: 1, name: "Sản phẩm 1", price: 200},
    {id: 2, name: "Sản phẩm 2", price: 200},
    {id: 3, name: "Sản phẩm 3", price: 200},
];


//lấy danh sách
export const getAll = (req, res) => {
    return res.json(products);
};

//lấy 1 sản phẩm
export const getOne = (req, res) => {
    const product = products.find(product => product.id == req.params.id);
    if(!product){
        return res.status(404).json({
            messge: "Không tìm thấy sàn phẩm nào"
        })
    };
    return res.json(product);
};

//thêm sản phẩm
export const addOne = (req, res) => {
    const product = { id: products.length + 1, ...req.body};
    products.push(product);
    return res.status(201).json(products);
};

//cập nhật
export const editOne = (req, res) => {
    const product = products.find(product => product.id == req.params.id);
    if(!product){
        return res.status(404).json({
            messge: "Không tìm thấy sản phẩm"
        });
    }
    
    const {name, price} = req.body;
    product.name = name || product.name;
    product.price = price || product.price;
};

//xoá
export const deleteOne = (req, res) => {
    const index = products.findIndex((p) => p.id === parseInt(req.params.id));
    // nếu không tìm ra index thì trả về 404
    if (index === -1) return res.status(404).json({ error: "Products not found" });

    // Xóa sản phẩm
    products.splice(index, 1);
    return res.json({ success: true });
};

