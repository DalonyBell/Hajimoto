from transformers import GPT2Tokenizer, GPT2LMHeadModel, Trainer, TrainingArguments, pipeline
from datasets import load_dataset
import os

# Hardcoded CSV path
csv_path = r"D:\Projects\HaykuAI\Hajimoto\all_haiku.csv"

# Check if the file exists
if not os.path.exists(csv_path):
    raise FileNotFoundError(f"The file '{csv_path}' does not exist. Please check the path.")

# Load your dataset from the CSV file
dataset = load_dataset('csv', data_files={'train': csv_path})

# Load the GPT-2 tokenizer and model
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
model = GPT2LMHeadModel.from_pretrained("gpt2")

# Tokenize the dataset
def tokenize_function(examples):
    return tokenizer(examples["HAYKU"], truncation=True, max_length=20)

# Apply tokenization to the dataset
tokenized_dataset = dataset.map(tokenize_function, batched=True)

# Set up training arguments
training_args = TrainingArguments(
    output_dir="./hayku-gpt2",  # Directory to save the model
    overwrite_output_dir=True,
    num_train_epochs=3,  # Number of training epochs
    per_device_train_batch_size=2,  # Batch size
    gradient_accumulation_steps=4,  # Accumulate gradients over 4 batches
    save_steps=500,  # Save model every 500 steps
    save_total_limit=2,  # Keep only the last 2 saved models
    logging_dir="./logs",  # Directory for logs
    logging_steps=100,  # Log every 100 steps
    prediction_loss_only=True,  # Simplify logging to show only loss
    fp16=True,  # Enable mixed precision training
)

# Initialize the Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset["train"],
)

# Fine-tune the model
print("Starting training...")
trainer.train()

# Save the fine-tuned model and tokenizer
output_dir = "./hayku-gpt2"
trainer.save_model(output_dir)
tokenizer.save_pretrained(output_dir)

print(f"Model and tokenizer saved to '{output_dir}'.")

# Load the fine-tuned model and tokenizer
fine_tuned_model = GPT2LMHeadModel.from_pretrained(output_dir)
fine_tuned_tokenizer = GPT2Tokenizer.from_pretrained(output_dir)

# Create a text generation pipeline
haiku_generator = pipeline("text-generation", model=fine_tuned_model, tokenizer=fine_tuned_tokenizer)

# Function to generate a haiku based on a prompt
def generate_haiku(prompt):
    generated_text = haiku_generator(prompt, max_length=20, num_return_sequences=1)
    return generated_text[0]['generated_text']

# Interactive loop
while True:
    user_prompt = input("Enter a prompt for your haiku (or type 'exit' to quit): ")
    if user_prompt.lower() == 'exit':
        break
    haiku = generate_haiku(user_prompt)
    print("\nGenerated Haiku:")
    print(haiku)
    print("\n")