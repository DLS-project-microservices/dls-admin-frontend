import { useState } from 'react';

const AddProduct = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState(0);
    
    const handleSubmit = async(e: React.SyntheticEvent) => {
      e.preventDefault();
        alert(`${name}`)
        const newProduct = {
          name,
          description,
          quantity,

        }
        setName('');
        setDescription('');
        setQuantity(0);
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
         
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Description:</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label>Quantity:</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </div>
          <button type="submit">Create new product</button>
        </form>

        </div>
        
    )
}

export default AddProduct;